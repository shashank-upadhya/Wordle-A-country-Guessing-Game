// import React, { useEffect, useRef, useCallback } from 'react';
// import { Loader } from '@googlemaps/js-api-loader';

// const GameMap = ({ targetCountry, incorrectGuesses, targetCoordinates, zoom }) => {
//     const mapRef = useRef(null);
//     const googleMapsApiKey = 'AIzaSyBWvquapTrZMcsVeW9HvbrZuwBRjnSrHF0';

//     const renderMap = useCallback(() => {
//         if (!mapRef.current) return;

//         const loader = new Loader({
//             apiKey: googleMapsApiKey,
//             version: 'weekly',
//         });

//         loader.load().then(async () => {
//             const { Map } = await google.maps.importLibrary('maps');
//             const map = new Map(mapRef.current, {
//                 // HARDCODED COORDINATES FOR TESTING
//                 center: { lat: 37.7749, lng: -122.4194 }, // San Francisco
//                 zoom: zoom || 10,
//                 mapTypeId: 'roadmap',
//             });

//             new google.maps.Marker({
//                 position: { lat: 37.7749, lng: -122.4194 },+
//                 map: map,
//                 title: 'Test Location',
//             });

//             //  console.log("targetCoordinates", targetCoordinates);
//             //  console.log("incorrectGuesses", incorrectGuesses);


//             if (incorrectGuesses && incorrectGuesses.length > 0) {
//                 incorrectGuesses.forEach((guess) => {
//                     if (guess.latitude && guess.longitude) {
//                         new google.maps.Marker({
//                             position: { lat: guess.latitude, lng: guess.longitude },
//                             map: map,
//                             title: `Incorrect Guess: ${guess.countryName}`,
//                             icon: {
//                                 path: google.maps.SymbolPath.CIRCLE,
//                                 fillColor: 'red',
//                                 fillOpacity: 1,
//                                 strokeWeight: 0,
//                                 scale: 6,
//                             },
//                         });
//                     }
//                 });
//             }
//         }).catch(e => {
//             console.error("Error loading map", e);
//             mapRef.current.innerHTML = "Error loading map";
//         });
//     }, [zoom, googleMapsApiKey]);  //  targetCoordinates, incorrectGuesses removed from here

//     useEffect(() => {
//         renderMap();
//     }, [renderMap]);

//     return <div ref={mapRef} style={{ width: '100%', height: '400px' }} />;
// };

// export default GameMap;

import React, { useEffect, useRef, useCallback } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const GameMap = ({ targetCountry, incorrectGuesses, targetCoordinates, zoom }) => {
    const mapRef = useRef(null);
    const googleMapsApiKey = 'AIzaSyBWvquapTrZMcsVeW9HvbrZuwBRjnSrHF0'; // Replace with your actual API key

    const renderMap = useCallback(() => {
        console.log("targetCoordinates:", targetCoordinates);
        if (!mapRef.current || !targetCoordinates) return;

        const loader = new Loader({
            apiKey: googleMapsApiKey,
            version: 'weekly',
        });

        loader.load().then(async () => {
            const { Map } = await google.maps.importLibrary('maps');
            //  const { LatLng } = await google.maps.importLibrary('maps');  // REMOVE THIS LINE

            // Use google.maps.LatLng
            const center = new google.maps.LatLng(targetCoordinates.latitude, targetCoordinates.longitude);  // CHANGE THIS LINE

            const map = new Map(mapRef.current, {
                center: center,
                zoom: zoom || 5,
                mapTypeId: 'roadmap',
            });

            // Add marker for the target country
            new google.maps.Marker({
                position: center, // Use the LatLng object here too
                map,
                title: targetCountry,
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    fillColor: 'green',
                    fillOpacity: 1,
                    strokeWeight: 0,
                    scale: 8,
                },
            });

            // Add markers for incorrect guesses
            if (incorrectGuesses && incorrectGuesses.length > 0) {
                incorrectGuesses.forEach((guess) => {
                    if (guess.latitude && guess.longitude) {
                        const guessLatLng = new google.maps.LatLng(guess.latitude, guess.longitude); // CHANGE THIS LINE
                        new google.maps.Marker({
                            position: guessLatLng, // Use LatLng for the guess too
                            map,
                            title: `Incorrect Guess: ${guess.countryName}`,
                            icon: {
                                path: google.maps.SymbolPath.CIRCLE,
                                fillColor: 'red',
                                fillOpacity: 1,
                                strokeWeight: 0,
                                scale: 6,
                            },
                        });
                    }
                });
            }
        }).catch(error => {
            console.error("Error loading map:", error);
            mapRef.current.innerHTML = "Error loading map.";
        });
    }, [targetCoordinates, incorrectGuesses, targetCountry, zoom, googleMapsApiKey]);

    useEffect(() => {
        if (targetCoordinates) {
            renderMap();
        }
    }, [renderMap, targetCoordinates]);

    return <div ref={mapRef} style={{ width: '100%', height: '400px' }} />;
};

export default GameMap
