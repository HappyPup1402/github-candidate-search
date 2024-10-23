import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);
  const [noMoreCandidates, setNoMoreCandidates] = useState(false);

  // Fetch the next candidate from the API
  const fetchNextCandidate = async () => {
    const users = await searchGithub();
    if (users.length === 0) {
      setNoMoreCandidates(true);
      return;
    }
    const nextUser = users[currentIndex];
    const candidateDetails = await searchGithubUser(nextUser.login);
    setCandidate(candidateDetails);
    setCurrentIndex(currentIndex + 1);
  };

  // Save candidate and fetch the next one
  const saveCandidate = () => {
    if (candidate) {
      const updatedSavedCandidates = [...savedCandidates, candidate];
      setSavedCandidates(updatedSavedCandidates);
      localStorage.setItem('savedCandidates', JSON.stringify(updatedSavedCandidates));
    }
    fetchNextCandidate();
  };

  // Skip candidate and fetch the next one
  const skipCandidate = () => {
    fetchNextCandidate();
  };

  useEffect(() => {
    fetchNextCandidate();
  }, []);

  return (
    <main>
      <h1>Candidate Search</h1>
      <div>
        {noMoreCandidates || !candidate ? (
          <p>No candidates available</p>
        ) : (
          <div className="card">
            <img src={candidate.avatar_url} alt={candidate.name} className="candidate-avatar" />
            <div className="candidate-info">
              <p>Name: {candidate.name || 'N/A'}</p>
              <p>Username: {candidate.login}</p>
              <p>Location: {candidate.location || 'N/A'}</p>
              <p>Email: {candidate.email || 'N/A'}</p>
              <p>Company: {candidate.company || 'N/A'}</p>
              <p>
                Profile: <a href={candidate.html_url} className="candidate-link">{candidate.html_url}</a>
              </p>
              <p>Bio: {candidate.bio}</p>
            </div>
            <div className="button-container">
              <button className="skip-button" onClick={skipCandidate}>-</button>
              <button className="save-button" onClick={saveCandidate}>+</button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default CandidateSearch;
