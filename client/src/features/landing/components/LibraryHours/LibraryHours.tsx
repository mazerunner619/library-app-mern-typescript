import "./LibraryHours.css"

const LibraryHours:React.FC = () => {
    
    return(
        <div className="library-hours">
            <h3>Library Hours</h3>
            <table className="library-hours-table" id="hours">
                <tbody>
                    <tr>
                        <td>Monday</td>
                        <td>10 AM - 6 PM</td>
                    </tr>
                    <tr>
                        <td>Tuesday</td>
                        <td>10 AM - 6 PM</td>
                    </tr>
                    <tr>
                        <td>Wednesday</td>
                        <td>10 AM - 6 PM</td>
                    </tr>
                    <tr>
                        <td>Thuraday</td>
                        <td>10 AM - 6 PM</td>
                    </tr>
                    <tr>
                        <td>Friday</td>
                        <td>10 AM - 6 PM</td>
                    </tr>
                    <tr>
                        <td>Saturday</td>
                        <td>10 AM - 6 PM</td>
                    </tr>
                </tbody>
            </table>

        </div>
    )
}

export default LibraryHours;