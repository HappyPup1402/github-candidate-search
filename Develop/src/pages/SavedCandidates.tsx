import { useState, useEffect } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  // Fetch saved candidates from local storage
  useEffect(() => {
    const storedCandidates = localStorage.getItem('savedCandidates');
    if (storedCandidates) {
      setSavedCandidates(JSON.parse(storedCandidates));
    }
  }, []);

  // Reject candidate and update local storage
  const rejectCandidate = (login: string) => {
    const updatedCandidates = savedCandidates.filter(candidate => candidate.login !== login);
    setSavedCandidates(updatedCandidates);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
  };

  return (
    <>
      <h1>Potential Candidates</h1>
      {savedCandidates.length === 0 ? (
        <p>No candidates have been saved.</p>
      ) : (
        <ul>
          {savedCandidates.map((candidate) => (
            <li key={candidate.login} className="candidate-item">
              <img src={candidate.avatar_url} alt={candidate.name}/>
              <p className="candidate-name">{candidate.name || 'N/A'}</p>
              <p className="candidate-location">{candidate.location || 'N/A'}</p>
              <p className="candidate-email">{candidate.email || 'N/A'}</p>
              <p className="candidate-company">{candidate.company || 'N/A'}</p>
              <p className="candidate-bio">{candidate.bio || 'N/A'}</p>
              <button className="reject-button" onClick={() => rejectCandidate(candidate.login)}>Reject</button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default SavedCandidates;
