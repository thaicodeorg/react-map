import type { LatLng } from 'leaflet';

// Interface สำหรับข้อมูลฟอร์มและพิกัด
export interface LocationFormData {
    title: string;
    lat: number | ''; 
    lng: number | ''; 
    description: string;
}

// Interface สำหรับ Props ที่ส่งไปยัง LocationMarker
export interface LocationMarkerProps {
    formData: LocationFormData;
    setformData: React.Dispatch<React.SetStateAction<LocationFormData>>;
    position: LatLng | null;
    setPosition: React.Dispatch<React.SetStateAction<LatLng | null>>;
}

// Interface สำหรับ Props ที่ส่งไปยัง LocationForm
export interface LocationFormProps {
    formData: LocationFormData;
    handleOnChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}