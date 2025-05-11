import { useState, useEffect } from 'react';
import { Moon, Sun, Search, Music, Github, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function RhymoApp() {
  const [theme, setTheme] = useState('light');
  const [query, setQuery] = useState('');
  const [songResults, setSongResults] = useState([]);  // Store songs list
  const [lyrics, setLyrics] = useState('');  // Store lyrics of the clicked song
  const [loading, setLoading] = useState(false);

  // Theme toggle effect
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim()) {
      setLoading(true);

      // Split the query into artist and song title
      const [artist] = query.split(' - ').map(str => str.trim());

      if (artist) {
        try {
          // Mock songs list (could be replaced with a real API call)
          const mockSongs = [
            { title: 'Love Story', artist: 'Taylor Swift' },
            { title: 'Blank Space', artist: 'Taylor Swift' },
            { title: 'Anti-Hero', artist: 'Taylor Swift' },
            { title: 'Shake It Off', artist: 'Taylor Swift' },
            { title: 'You Belong with Me', artist: 'Taylor Swift' },
            { title: 'All Too Well', artist: 'Taylor Swift' },
            { title: 'Bad Blood', artist: 'Taylor Swift' },
            { title: 'Cardigan', artist: 'Taylor Swift' },
            { title: 'Delicate', artist: 'Taylor Swift' },
            { title: 'Wildest Dreams', artist: 'Taylor Swift' },
            { title: 'Look What You Made Me Do', artist: 'Taylor Swift' },
            { title: 'Red', artist: 'Taylor Swift' },
            { title: 'Fearless', artist: 'Taylor Swift' },
            { title: 'Enchanted', artist: 'Taylor Swift' },
            { title: 'Teardrops on My Guitar', artist: 'Taylor Swift' },
          ];  // Replace this with your API call for songs

          setSongResults(mockSongs);  // Set mock song results
          setLoading(false);
        } catch (error) {
          console.log('Error fetching songs', error);
          setLoading(false);
        }
      }
    }
  };

  const handleClickSong = async (song) => {
    setLoading(true);
    try {
      // Fetch lyrics from Lyrics.ovh API
      const response = await fetch(`https://api.lyrics.ovh/v1/${song.artist}/${song.title}`);
      const data = await response.json();

      if (data.lyrics) {
        setLyrics(data.lyrics);
      } else {
        setLyrics('Sorry, lyrics not available.');
      }
    } catch (error) {
      console.log('Error fetching lyrics', error);
      setLyrics('An error occurred while fetching the lyrics.');
    }
    setLoading(false);
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Navbar */}
      <nav className={`p-4 flex justify-between items-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-md transition-colors duration-300`}>
        <div className="flex items-center space-x-2">
          <Music className={`h-8 w-8 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">Rhymo</span>
        </div>
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full hover:bg-opacity-20 transition-all duration-300 ${theme === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}`}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <Sun className="text-yellow-300" /> : <Moon className="text-gray-700" />}
        </button>
      </nav>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h1 className={`text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>Lyrics Finder</h1>
          <p className={`text-lg mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Find lyrics for your favorite Taylor Swift songs right here!
          </p>

          <div className="flex mb-8">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Artist - Song (e.g., Taylor Swift - Love Story)"
              className={`flex-grow p-3 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'} border`}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
            />
            <button
              onClick={handleSearch}
              className="flex items-center justify-center px-4 rounded-r-lg bg-purple-600 hover:bg-purple-700 text-white transition-colors duration-300"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Results */}
          {loading && (
            <div className="flex justify-center my-8">
              <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {!loading && songResults.length > 0 && (
            <div className="animate-fadeIn">
              <h2 className={`text-2xl font-semibold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>Search Results</h2>
              <div className={`grid gap-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg`}>
                {songResults.map((song, index) => (
                  <div
                    key={index}
                    onClick={() => handleClickSong(song)}
                    className={`p-4 rounded-lg transition-all duration-300 hover:scale-105 ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} cursor-pointer`}
                  >
                    <h3 className="text-xl font-bold mb-1">{song.title}</h3>
                    <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                      <span className="font-medium">{song.artist}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Lyrics Display */}
          {lyrics && !loading && (
            <div className="mt-8 p-6 bg-gray-800 text-white rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Lyrics</h2>
              <pre className="whitespace-pre-wrap text-sm">{lyrics}</pre>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className={`p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-inner transition-colors duration-300`}>
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <Music className={`h-6 w-6 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
                <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">Rhymo</span>
              </div>
              <p className={`mt-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>© 2025 Rhymo. All rights reserved.</p>
            </div>

            <div className="flex space-x-4">
              <a href="https://github.com/upadhyayaniket29" className={`hover:text-purple-500 transition-colors ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                <Github className="w-5 h-5" />
              </a>
              <a href="https://x.com/Aniketu89741067" className={`hover:text-purple-500 transition-colors ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/aniket-upadhyay-02ba07222/" className={`hover:text-purple-500 transition-colors ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}




