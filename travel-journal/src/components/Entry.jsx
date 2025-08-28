export default function Entry(props){
    return(
            <div className="place-container">
                <div className="picture-container">
                    <img src={props.img.src} alt={props.img.alt} />
                </div>

                <div className="text-container">
                    <div className="place-header">
                        <img src="src/assets/location.png" alt="marker.png" />
                        <p className="place-name">{props.country}</p>
                        <p className="google-link"><a href={props.googleMapsLink}>View on Google Maps</a></p>
                    </div>

                    <h1>{props.title}</h1>

                    <div className="about-place">
                        <p><b>{props.dates}</b></p>
                        <p className="place-description">{props.text}</p>
                    </div>
                </div>
            </div>
    )
}