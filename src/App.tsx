import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, Pane, Rectangle, Circle } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import Chart from 'chart.js/auto';
import "./App.css"
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory';
import CovidCases from './CovidCases'

interface CountryData {
  country: string;
  lastItemData: any;
}

interface CountryCases {
  [key: string]: number;
}

interface MarkerData {
  country: string;
  geocode: [number, number];
  popUp: string;
}


function App() {

  const [markers, setMarkers] = useState<MarkerData[]>([
    {
      country: 'United States',
      geocode: [37.0902, -95.7129],
      popUp: ' Estados Unidos',
    },
    {
      country: 'brazil',
      geocode: [-14.2350, -51.9253],
      popUp: 'Brasil',
    },
    {
      country: 'china',
      geocode: [35.8617, 104.1954],
      popUp: 'China',
    },
    {
      country: 'russia',
      geocode: [61.5240, 105.3188],
      popUp: 'Rússia',
    },
    {
      country: 'india',
      geocode: [20.5937, 78.9629],
      popUp: 'Índia',
    },
    {
      country: 'japan',
      geocode: [36.2048, 138.2529],
      popUp: 'Japão',
    },
    {
      country: 'germany',
      geocode: [51.1657, 10.4515],
      popUp: 'Alemanha',
    },
    {
      country: 'United Kingdom',
      geocode: [55.3781, -3.4360],
      popUp: 'Reino Unido',
    },
    {
      country: 'france',
      geocode: [46.6034, 1.8883],
      popUp: 'França',
    },
    {
      country: 'canada',
      geocode: [56.1304, -106.3468],
      popUp: 'Canadá',
    },
    {
      country: 'australia',
      geocode: [-25.2744, 133.7751],
      popUp: 'Austrália',
    },
    {
      country: 'argentina',
      geocode: [-38.4161, -63.6167],
      popUp: 'Argentina',
    },
    {
      country: 'mexico',
      geocode: [23.6345, -102.5528],
      popUp: 'México',
    },
    {
      country: 'italy',
      geocode: [41.8719, 12.5674],
      popUp: 'Itália',
    },
    {
      country: 'south africa',
      geocode: [-30.5595, 22.9375],
      popUp: 'África do Sul',
    },
    {
      country: 'south korea',
      geocode: [35.9078, 127.7669],
      popUp: 'Coreia do Sul',
    },
    {
      country: 'indonesia',
      geocode: [-0.7893, 113.9213],
      popUp: 'Indonésia',
    },
    {
      country: 'turkey',
      geocode: [38.9637, 35.2433],
      popUp: 'Turquia',
    },
    {
      country: 'thailand',
      geocode: [15.8700, 100.9925],
      popUp: 'Tailândia',
    },
    {
      country: 'egypt',
      geocode: [26.8206, 30.8025],
      popUp: 'Egito',
    },
    {
      country: 'philippines',
      geocode: [12.8797, 121.7740],
      popUp: ' Filipinas',
    },
    {
      country: 'pakistan',
      geocode: [30.3753, 69.3451],
      popUp: 'Paquistão',
    },
    {
      country: 'bangladesh',
      geocode: [23.6850, 90.3563],
      popUp: 'bangladesh',
    },
    {
      country: 'nigeria',
      geocode: [9.0820, 8.6753],
      popUp: 'Nigéria',
    },
    {
      country: 'vietnam',
      geocode: [14.0583, 108.2772],
      popUp: 'Vietnã',
    },
    {
      country: 'iran',
      geocode: [32.4279, 53.6880],
      popUp: 'Irã',
    },
    {
      country: 'colombia',
      geocode: [4.5709, -74.2973],
      popUp: 'Colômbia',
    },
    {
      country: 'spain',
      geocode: [40.4637, -3.7492],
      popUp: 'Espanha',
    },
    {
      country: 'poland',
      geocode: [51.9194, 19.1451],
      popUp: 'Polônia',
    },
    {
      country: 'saudi arabia',
      geocode: [23.8859, 45.0792],
      popUp: 'Arábia Saudita',
    },
    {
      country: 'ukraine',
      geocode: [48.3794, 31.1656],
      popUp: 'Ucrânia',
    },
    {
      country: 'malaysia',
      geocode: [4.2105, 101.9758],
      popUp: 'Malásia',
    },
    {
      country: 'peru',
      geocode: [-9.1900, -75.0152],
      popUp: 'Peru',
    },
    {
      country: 'morocco',
      geocode: [31.7917, -7.0926],
      popUp: 'marrocos',
    },
    {
      country: 'romania',
      geocode: [45.9432, 24.9668],
      popUp: 'Romênia',
    },
    {
      country: 'chile',
      geocode: [-35.6751, -71.5430],
      popUp: 'Chile',
    },
    {
      country: 'kazakhstan',
      geocode: [48.0196, 66.9237],
      popUp: 'Cazaquistão',
    },
    {
      country: 'ecuador',
      geocode: [-1.8312, -78.1834],
      popUp: 'Equador',
    },
    {
      country: 'greece',
      geocode: [39.0742, 21.8243],
      popUp: 'Grécia',
    },
    {
      country: 'netherlands',
      geocode: [52.1326, 5.2913],
      popUp: 'Holanda',
    },
    {
      country: 'portugal',
      geocode: [39.3999, -8.2245],
      popUp: 'Portugal',
    },
    {
      country: 'czech republic',
      geocode: [49.8175, 15.4729],
      popUp: 'República Tcheca',
    },
    {
      country: 'iraq',
      geocode: [33.2232, 43.6793],
      popUp: 'Iraque',
    },
    {
      country: 'syria',
      geocode: [34.8021, 38.9968],
      popUp: 'Síria',
    },
    {
      country: 'bangladesh',
      geocode: [23.6850, 90.3563],
      popUp: 'Banngladesh',
    },
    {
      country: 'sudan',
      geocode: [12.8628, 30.2176],
      popUp: 'Sudão',
    },
    {
      country: 'sweden',
      geocode: [60.1282, 18.6435],
      popUp: 'Suécia',
    },
    {
      country: 'serbia',
      geocode: [44.0165, 21.0059],
      popUp: 'Sérvia',
    },
    {
      country: 'switzerland',
      geocode: [46.8182, 8.2275],
      popUp: 'Suíça',
    },
    {
      country: 'vietnam',
      geocode: [14.0583, 108.2772],
      popUp: 'Vietnã',
    },
]);

  
  const [countryCases, setCountryCases] = useState<{ [key: string]: number }>({});
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    const input = e.target.value.toLowerCase();
    const suggestions = markers
      .map(marker => marker.country)
      .filter(country => country.toLowerCase().startsWith(input));
    setSuggestions(suggestions);
    setSearchTerm(e.target.value);
    if (input === '') {
      setSuggestions([]);
      return; // Não é necessário continuar se não houver entrada
    }
  };

  const handleSuggestionClick = (country: string) => {
    setSearchTerm(country);
    setSuggestions([]);
    setSelectedCountry(country);
    setIsModalOpen(true);
  };


  const data = [
    {quarter: 1, earnings: 
      103802702},
    {quarter: 2, earnings: 37076053},
    {quarter: 3, earnings: 44690738},
    {quarter: 4, earnings: 5711929}
  ];

  


  useEffect(() => {
    const fetchData = async () => {
      const apiKey = '+7F93yRR9Zo7i7LTILE7hw==bKipKsDOLYPd26MA'; // Sua chave de API

      try {
        const newMarkers = await Promise.all(markers.map(async (marker) => {
          const country = marker.country;
          const url = `https://api.api-ninjas.com/v1/covid19?country=${country}`;
          const response = await fetch(url, {
            headers: {
              'X-Api-Key': apiKey
            }
          });
          if (!response.ok) {
            throw new Error(`Erro ao carregar dados para ${country}`);
          }
          const jsonData = await response.json();
          const casesData = jsonData[0]?.cases; // Ajuste para acessar os casos corretamente
          const lastDate = Object.keys(casesData).pop();
          const totalCases = casesData[lastDate]?.total || 0;
          setCountryCases((prev) => ({
            ...prev,
            [country]: totalCases
          }));
          const newPopUp = `${marker.popUp}<br/>Total de casos: ${totalCases}`;
          return {
            ...marker,
            popUp: newPopUp
          };
        }));
        setMarkers(newMarkers);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, []);

  

  return (
    <div>
      <div className=' flex justify-center font-bold text-2xl mt-5'>Casos de Covid-19 pelo mundo</div>
      <div className='flex justify-center p-5'>
        <input
          type="text"
          placeholder="Pesquisar país..."
          value={searchTerm}
          onChange={handleInputChange}
          className="p-2 border border-gray-300 rounded-md"
        />
      </div>
      {suggestions.length > 0 && (
        <div className='flex justify-center'>
          <ul className="w-64 border border-gray-300 rounded-md">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <div className='flex justify-center p-5 ' >
        <MapContainer center={[51.505, -0.09]} zoom={4} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {markers.map((marker, index) => (
            <Marker key={index} position={marker.geocode}>
              <Popup>
                <h1>{marker.country}</h1>
                {/*<div dangerouslySetInnerHTML={{ __html: marker.popUp }} />*/}
                <p>Total de casos: {countryCases[marker.country]}</p>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      
      <div className='h-[30vh]'>
        <VictoryChart
          // domainPadding will add space to each side of VictoryBar to
          // prevent it from overlapping the axis
          domainPadding={20}
        >
          <VictoryAxis
            // tickValues specifies both the number of ticks and where
            // they are placed on the axis
            tickValues={[1, 2, 3, 4]}
            tickFormat={["Estados Unidos", "Brazil", "India", "Ucrania"]}
          />
          <VictoryAxis
            dependentAxis
            // tickFormat specifies how ticks should be displayed
            tickFormat={(x) => (`${x / 1000}k`)}
          />
          <VictoryBar
            data={data}
            x="quarter"
            y="earnings"
            animate={{
              duration: 1000000, // duração da animação em milissegundos
              onLoad: { duration: 100000 } // animação quando o componente é carregado
            }}
          />
        </VictoryChart>

      </div>
      
      <div>
        <h2 className=' flex justify-center text-2xl font-semibold'>Lista de Total de Casos por País:</h2>
        <ul className=' flex flex-col justify-start p-5 text-xl'>
          {Object.entries(countryCases).map(([country, cases]) => (
            <li className='mb-2 ' key={country}><div className=' font-semibold text-2xl'> {country} </div> <div className=' flex'> <p className=' font-semibold'> Quantidade de Casos:</p>  <p>{cases}</p></div> </li>
          ))}
        </ul>
      </div>
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center" >
          <div className="bg-white p-8 rounded-md">
            <h2 className="text-2xl font-bold mb-4">{selectedCountry}</h2>
            <p>Total de casos: {countryCases[selectedCountry]}</p>
            <button onClick={() => setIsModalOpen(false)} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
  };

export default App;