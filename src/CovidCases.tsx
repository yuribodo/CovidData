import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CovidCases: React.FC = () => {
  const [cases, setCases] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCovidCases = async () => {
      try {
        const response = await axios.get('https://api.api-ninjas.com/v1/covid19', {
          params: {
            country: ''
          },
          headers: {
            'X-Api-Key': '+7F93yRR9Zo7i7LTILE7hw==bKipKsDOLYPd26MA' // Substitua pela sua chave de API
          }
        });
        setCases(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar os casos de Covid-19:', error);
        setLoading(false);
      }
    };

    fetchCovidCases();
  }, []);

  return (
    <div>
      <h2>Casos de Covid-19</h2>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <ul>
          {cases.map((countryData, index) => (
            <li key={index}>
              <h3>{countryData.country}</h3>
              <ul>
                {Object.entries(countryData.cases).map(([date, data]) => (
                  <li key={date}>
                    <strong>Data:</strong> {date} | <strong>Total:</strong> {data.total} | <strong>Novos:</strong> {data.new}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CovidCases;
