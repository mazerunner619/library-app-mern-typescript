import "./CatalogOverview.css"
import { useState } from "react";
import { generateRandomGenres } from "../../utils/CatalogUtils";
import CatalogOverviewSection from "../CatalogOverviewSection/CatalogOverviewSection";

const Component:React.FC = () => {
    const [genres] = useState<string[]>( () => {
        return generateRandomGenres()
    });
    
    return(
        <>
            <div className="catalog-overview">
                <h4>Browse our selected books below, or search for something </h4>
                {
                    genres.map( genre => {
                        return <CatalogOverviewSection 
                        key={genre} 
                        label={genre} 
                        />
                    })
                }
            </div>    
        </>
    )
}
export default Component;
