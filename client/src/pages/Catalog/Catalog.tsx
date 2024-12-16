 import { useLocation } from "react-router-dom"
import { CatalogOverview, CatalogSearch } from "../../features/catalog";
import React, { useEffect } from "react";

 const Component:React.FC = () => {
    const location = useLocation();

    useEffect(() => {
        console.log("Atif => ", location)
    }, [])
     return(
        <div className="page text-sm md:text-lg">
            <div className="page-container">
                {
                    location.search === "" ? 
                    <CatalogOverview />:
                    <CatalogSearch/>
                }
            </div>
        </div>
     )
 }

 export default Component;