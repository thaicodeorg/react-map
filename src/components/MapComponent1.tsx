
import { MapContainer } from 'react-leaflet/MapContainer'
import BaseMap from './layer/BaseMap'
import { Marker, Popup, useMap, useMapEvents } from 'react-leaflet'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { LatLng } from 'leaflet'
import { Marker as LeafletMarker } from 'leaflet';

interface LocationFormData {
    title: string;
    lat: number | ''; // อาจใช้ number เพื่อบังคับว่าเป็นตัวเลข หรือใช้ string เปล่าเริ่มต้น
    lng: number | ''; // เราจะใช้ number | '' เพื่อให้ง่ายต่อการใช้งานในฟอร์ม
    description: string;
}

const initialFormData: LocationFormData = {
    title: '',
    lat: '',
    lng: '',
    description: '',
};


const MapComponent = () => {
    //const map = useMap()
    // State สำหรับ Marker Position
    const [position, setPosition] = useState<LatLng | null>(null)
    const [formData, setformData] = useState<LocationFormData>(initialFormData);
    // Ref และ Event Handler สำหรับ Marker Draggable
    const markerRef = useRef<LeafletMarker | null>(null);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        console.log(e.target.name, e.target.value)
        setformData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        // 1. ป้องกันการรีโหลดหน้าจอ
        e.preventDefault();

        // 2. ดึงข้อมูล State ที่ต้องการส่ง (จาก formData ที่อยู่ใน useState)
        console.log("Data to submit:", formData);

        // 3. เรียก API หรือฟังก์ชันส่งข้อมูล
        // sendDataToBackend(formData);
    };

    const LocationMarker = () => {
        // 1 Map Event Handler
        const map = useMapEvents({
            click(e) {
                console.log(e)
                map.flyTo(e.latlng, map.getZoom())
                // 1. อัปเดต Marker position// 3. Map Events Handler
                setPosition(e.latlng)
                // 2. อัปเดต Lat/Lng ใน Form Data
                setformData({
                    ...formData,
                    lat: e.latlng.lat,
                    lng: e.latlng.lng
                })
            }
        })

        // 2 Effect เพื่อให้แผนที่ FlyTo ไปยังตำแหน่งใหม่เมื่อ Lat/Lng ในฟอร์มเปลี่ยน
        useEffect(() => {
            // Destructure primitive strings here
            const { lat, lng } = formData;

            if (lat !== '' && lng !== '') {
                const numericLat = Number(lat);
                const numericLng = Number(lng);

                if (!isNaN(numericLat) && !isNaN(numericLng)) {
                    const newLatLng = L.latLng(numericLat, numericLng);

                    // 2. This is a side effect on the map object
                    map.flyTo(newLatLng, map.getZoom() > 10 ? map.getZoom() : 13, {
                        animate: true,
                        duration: 0.8
                    });
                } else {
                    setPosition(null);
                }
            } else {
                setPosition(null);
            }
        }, [formData, map]);

        // check position เป็น null ไหม
        return position === null ? null : (
            <Marker
                position={position}
                draggable={true}
                eventHandlers={eventHandlers}
                ref={markerRef} >
                <Popup>You are here {position.lat}, {position.lng} </Popup>
            </Marker>
        )
    } // end LocationMarker
    // 3 Handler drag
    const eventHandlers = useMemo(() => ({
        dragend() {
            const marker = markerRef.current;
            if (marker) {
                // Get the new latitude and longitude from the marker
                const newLatLng = marker.getLatLng();

                // Update the state with the new position
                // Note: You might also want to update the formData state here 
                // if the form needs to reflect the dragged position.
                setPosition(newLatLng);
                // React updater function  
                setformData({
                    ...formData,
                    lat: newLatLng.lat,
                    lng: newLatLng.lng
                })
                console.log('New position after drag:', newLatLng.lat, newLatLng.lng);
            }
        },
    }), [setPosition]);


    return (
        // html
        <div className="flex w-full">
            <div className="w-4/6 bg-blue-100 p-4">
                <MapContainer
                    style={{ width: '100%', height: '100vh' }}
                    center={[13.736717, 100.523186]}
                    zoom={13}
                    scrollWheelZoom={true}>
                    <BaseMap />
                    <LocationMarker />
                </MapContainer>
            </div>

            <div className="w-2/6 bg-green-100 p-4">
                <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto p-6 bg-white shadow-xl rounded-lg space-y-4">
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Location Data Form</h2>

                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title / ชื่อสถานที่</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            onChange={handleOnChange}
                            required
                            placeholder="เช่น ตลาดน้ำดำเนินสะดวก"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label htmlFor="lat" className="block text-sm font-medium text-gray-700">Latitude / ละติจูด</label>
                            <input
                                type="number"
                                step="any"
                                id="lat"
                                name="lat"
                                value={formData.lat}
                                onChange={handleOnChange}
                                required
                                placeholder="เช่น 13.7563"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>

                        <div>
                            <label htmlFor="lng" className="block text-sm font-medium text-gray-700">lngitude / ลองจิจูด</label>
                            <input
                                type="number"
                                step="any"
                                id="lng"
                                name="lng"
                                value={formData.lng}
                                onChange={handleOnChange}
                                required
                                placeholder="เช่น 100.5018"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description / รายละเอียด</label>
                        <textarea
                            id="description"
                            name="description"
                            onChange={handleOnChange}
                            rows={4}
                            placeholder="อธิบายข้อมูลเกี่ยวกับสถานที่นี้โดยย่อ"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        ></textarea>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150"
                        >
                            Save Location
                        </button>
                    </div>
                </form>
            </div>
        </div>


    )
}

export default MapComponent