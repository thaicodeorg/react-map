import  { useEffect, useMemo, useRef } from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';
import L, { Marker as LeafletMarker } from 'leaflet';
import type { LocationMarkerProps } from '../types';

const LocationMarker = ({
    formData,
    setformData,
    position,
    setPosition
} : LocationMarkerProps) => {
    // Ref สำหรับ Leaflet Marker Object เพื่อใช้ใน Drag Handler
    const markerRef = useRef<LeafletMarker | null>(null);
    
    // 1. Map Click Event Handler (ใช้ useMapEvents)
    const map = useMapEvents({
        click(e) {
            map.flyTo(e.latlng, map.getZoom());
            
            // 1. อัปเดต Marker position
            setPosition(e.latlng);
            
            // 2. อัปเดต Lat/Lng ใน Form Data 
            // updater function  c=> {c+1}
            setformData(prevData => ({
                ...prevData,
                lat: e.latlng.lat,
                lng: e.latlng.lng,
            }));
        }
    });

    // 2. Effect เพื่อให้แผนที่ FlyTo ไปยังตำแหน่งใหม่เมื่อ Lat/Lng ในฟอร์มเปลี่ยน
    useEffect(() => {
        const { lat, lng } = formData;

        if (lat !== '' && lng !== '') {
            const numericLat = Number(lat);
            const numericLng = Number(lng);

            if (!isNaN(numericLat) && !isNaN(numericLng)) {
                // อัปเดต position state เพื่อให้ Marker แสดงขึ้น
                const newLatLng = L.latLng(numericLat, numericLng);
                setPosition(newLatLng); 
                
                // FlyTo โดยกำหนด Zoom ขั้นต่ำเป็น 13
                map.flyTo(newLatLng, map.getZoom() > 10 ? map.getZoom() : 13, {
                    animate: true,
                    duration: 0.8
                });
            } else {
                // ถ้าพิกัดไม่ถูกต้อง ให้ซ่อน Marker
                setPosition(null);
            }
        } else {
            // ถ้า Lat/Lng ถูกล้าง ให้ซ่อน Marker
            setPosition(null);
        }
    }, [formData, map, setPosition]); // เพิ่ม setPosition ใน dependency array ด้วย

    // 3. Handler สำหรับ Marker Drag (ใช้ useMemo เพื่อคง Reference ของ Object)
    const eventHandlers = useMemo(() => ({
        dragend() {
            const marker = markerRef.current;
            if (marker) {
                const newLatLng = marker.getLatLng();

                // อัปเดต State Marker position
                setPosition(newLatLng);
                
                // อัปเดต State Form Data
                setformData(prevData => ({
                    ...prevData,
                    lat: newLatLng.lat,
                    lng: newLatLng.lng,
                }));
                console.log('New position after drag:', newLatLng.lat, newLatLng.lng);
            }
        },
    }), [setPosition, setformData]); // Dependency: setPosition และ setformData

    // แสดง Marker ถ้ามี position
    return position === null ? null : (
        <Marker
            position={position}
            draggable={true}
            eventHandlers={eventHandlers}
            ref={markerRef}
        >
            <Popup>You are here {position.lat.toFixed(6)}, {position.lng.toFixed(6)}</Popup>
        </Marker>
    );
}

export default LocationMarker;