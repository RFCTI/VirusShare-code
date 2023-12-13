import React, { useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const QueryPage: React.FC = () => {
  const [hashes, setHashes] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const apikey = process.env.REACT_APP_VIRUS_SHARE_API_KEY;

  const handleHashesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHashes(event.target.value);
  };

  const handleQuery = async () => {
    setLoading(true);
    const hashList = hashes.split('\n').filter(hash => hash.trim() !== '');
    let tempResults = [];

    for (const hash of hashList) {
      const response = await axios.get(`https://virusshare.com/apiv2/file?apikey=${apikey}&hash=${hash}`);
      tempResults.push(response.data);
      setResults(tempResults);
      await new Promise(r => setTimeout(r, 25000)); // Wait for 25 seconds before the next request
    }

    setLoading(false);
  };

  const downloadResults = () => {
    const json = JSON.stringify(results, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    saveAs(blob, 'query-results.json');
  };

  return (
    <div className="query-page">
      <div className="query-input">
        <textarea
          value={hashes}
          onChange={handleHashesChange}
          placeholder="Enter MD5 or hash values, each on a new line."
        />
        <button onClick={handleQuery} disabled={loading}>
          {loading ? 'Querying...' : 'Start Query'}
        </button>
      </div>
      <div className="query-output">
        {results.map((result, index) => (
          <div key={index}>
            <SyntaxHighlighter language="json" style={docco}>
              {JSON.stringify(result, null, 2)}
            </SyntaxHighlighter>
          </div>
        ))}
      </div>
      <div className="download-button">
        <button onClick={downloadResults}>Download Results</button>
      </div>
    </div>
  );
};

export default QueryPage;
