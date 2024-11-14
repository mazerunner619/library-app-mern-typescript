import { BookOfTheWeek, LibraryCard, LibraryHours, UpcomingEvents } from '../../features/landing'
import './HomePage.css'

export default function HomePage():JSX.Element{

    return(
        <div className="page">
            <div className="homepage-container">
                <div className="homepage-left">
                    <BookOfTheWeek />
                    <UpcomingEvents />
                </div>
                <div className="homepage-right">
                    <LibraryCard />
                    <LibraryHours />
                </div>
            </div>
        </div>
    )
}