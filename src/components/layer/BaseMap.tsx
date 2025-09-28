
import { LayersControl, TileLayer } from 'react-leaflet'

const BaseMap = () => {
    // tsx
    const sphere_map_api: string = import.meta.env.VITE_SPHERE_MAP_API || '';

 
    // Layer URLs ต่างๆ
    const sphereLayers = {
       // sphere_streets: `https://basemap.sphere.gistda.or.th/tiles/thailand_images/EPSG3857/{z}/{x}/{y}.jpeg?key=${sphere_map_api}`,
        thailand_images: `https://basemap.sphere.gistda.or.th/tiles/thailand_images/EPSG3857/{z}/{x}/{y}.jpeg?key=${sphere_map_api}`,
        sphere_hybrid: `https://basemap.sphere.gistda.or.th/tiles/sphere_hybrid/EPSG3857/{z}/{x}/{y}.jpeg?key=${sphere_map_api}`,
    };

    return (
        // jsx
        <LayersControl position='topright'>
            <LayersControl.BaseLayer name='openstreetmap' checked>
                <TileLayer url='https://tile.openstreetmap.org/{z}/{x}/{y}.png' />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name='Thunderforest'>
                <TileLayer url='https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png' />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name='Satelite'>
                <TileLayer url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}' />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name='Sphere Thailand'>
                <TileLayer
                    attribution='&copy; GISTDA Sphere Map'
                    url={sphereLayers.thailand_images} />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name='Sphere Hybrid'>
                <TileLayer
                    attribution='&copy; GISTDA sphere_hybrid'
                    url={sphereLayers.sphere_hybrid} />
            </LayersControl.BaseLayer>
        </LayersControl>
    )
}

export default BaseMap

// LayerControl, TileLayer