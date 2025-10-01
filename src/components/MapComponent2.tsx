import React, { useState, useRef, useCallback } from 'react';
import { MapContainer } from 'react-leaflet/MapContainer';
import BaseMap from './layer/BaseMap';
import LocationMarker from './LocationMarker';
import LocationForm from './LocationForm';
import type { LocationFormData } from '../types'; // นำเข้า Type
 // นำเข้า Type
import type { LatLng } from 'leaflet';
import 'leaflet/dist/leaflet.css'; // อย่าลืม CSS ของ Leaflet

// กำหนดค่าเริ่มต้น
const initialFormData: LocationFormData = {
    title: '',
    lat: '',
    lng: '',
    description: '',
};

const MapComponent2: React.FC = () => {
    // State ทั้งหมดถูกเก็บไว้ที่คอมโพเนนต์หลักนี้
    const [position, setPosition] = useState<LatLng | null>(null);
    const [formData, setformData] = useState<LocationFormData>(initialFormData);

    // 1. Handler สำหรับการเปลี่ยนแปลงค่าในฟอร์ม (ใช้ useCallback เพื่อประสิทธิภาพ)
    const handleOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        // ใช้ Functional update formState เพื่อรับประกันว่าใช้ค่าล่าสุด
        setformData(prevData => ({
            ...prevData,
            [e.target.name]: e.target.value
        }));
    }, []);

    // 2. Handler สำหรับการส่งฟอร์ม (ใช้ useCallback เพื่อคง Reference)
    const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Data to submit:", formData);
        // TODO: เรียก API ส่งข้อมูลไป Backend (sendDataToBackend(formData);)
    }, [formData]); // Dependency คือ formData (เพื่อเข้าถึงค่าล่าสุด)

    return (
        <div className="flex w-full">
            {/* -------------------- Map Area (4/6) -------------------- */}
            <div className="w-4/6 bg-blue-100 p-4">
                <MapContainer
                    style={{ width: '100%', height: '100vh' }}
                    center={[13.736717, 100.523186]}
                    zoom={13}
                    scrollWheelZoom={true}
                >
                    {/* Base Map layer */}
                    <BaseMap />
                    
                    {/* ส่ง State และ Setter ไปยัง LocationMarker */}
                    <LocationMarker
                        formData={formData}
                        setformData={setformData}
                        position={position}
                        setPosition={setPosition}
                    />
                </MapContainer>
            </div>

            {/* -------------------- Form Area (2/6) -------------------- */}
            {/* ส่ง State และ Handler ไปยัง LocationForm */}
            <LocationForm
                formData={formData}
                handleOnChange={handleOnChange}
                handleSubmit={handleSubmit}
            />
        </div>
    );
}

export default MapComponent2;