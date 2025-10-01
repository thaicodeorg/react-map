import type { LocationFormProps } from '../types';

const LocationForm = ({
    formData,
    handleOnChange,
    handleSubmit,
}: LocationFormProps) => {
    return (
        <div className="w-2/6 bg-green-100 p-4">
            <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto p-6 bg-white shadow-xl rounded-lg space-y-4">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Location Data Form</h2>

                {/* Title/ชื่อสถานที่ */}
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

                {/* Lat/Lng Inputs */}
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
                        <label htmlFor="lng" className="block text-sm font-medium text-gray-700">Longitude / ลองจิจูด</label>
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

                {/* Description */}
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

                {/* Submit Button */}
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
    );
}

export default LocationForm;