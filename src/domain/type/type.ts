type CityData = {
    name: string;
    stadiumName: string;
    capacity: number;
};

export const CITY_MAP: Record<string, CityData[]> = {
    USA: [
        { name: "Atlanta", stadiumName: "Mercedes-Benz Stadium", capacity: 67382 },
        { name: "Boston", stadiumName: "Gillette Stadium", capacity: 63815 },
        { name: "Dallas", stadiumName: "AT&T Stadium", capacity: 70122 },
        { name: "Houston", stadiumName: "NRB Stadium", capacity: 68311 },
        { name: "Kansas City", stadiumName: "Arrowhead Stadium", capacity: 67513 },
        { name: "Los Angeles", stadiumName: "SoFi Stadium", capacity: 70000 },
        { name: "Miami", stadiumName: "Hard Rock Stadium", capacity: 65000 },
        { name: "New York", stadiumName: "MetLife Stadium", capacity: 75000 },
        { name: "Philadelphia", stadiumName: "Lincoln Financial Field", capacity: 70909 },
        { name: "Seattle", stadiumName: "Lumen Field", capacity: 69000 },
        { name: "San Francisco", stadiumName: "Levi's Stadium", capacity: 70909 },
    ],
    Mexico: [
        { name: "Guadalajara", stadiumName: "Estadio Akron", capacity: 44330 },
        { name: "Mexico City", stadiumName: "Estadio Azteca", capacity: 72766 },
        { name: "Monterrey", stadiumName: "Estadio BBVA", capacity: 50113 },
    ],
    Canada: [
        { name: "Vancouver", stadiumName: "BC Place", capacity: 54000 },
        { name: "Toronto", stadiumName: "BMO Field", capacity: 45000 },
    ],
};