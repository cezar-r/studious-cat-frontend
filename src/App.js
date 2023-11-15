import { Route, Routes } from 'react-router-dom';

import HomePage from './src/home_page/HomePage';
import TermsPage from './src/footer_pages/TermsPage';
import FaqPage from './src/footer_pages/FaqPage';
import PrivacyPage from './src/footer_pages/PrivacyPage';
import ContactPage from './src/footer_pages/ContactPage';
import VerificationPage from './src/verification_page/VerificationPage';
import CreateProfilePage from './src/onboarding/CreateProfilePage';
import CalendarPage from './src/calendar_page/CalendarPage';
import ProfilePage from './src/profile_page/ProfilePage';
import AuthCallback from './src/home_page/AuthCallback';
import './App.css';

/**
 * TODO
 * HOMEPAGE:
 *  change font
 *  get logo
 *  change border on search input when selected
 * 
 */

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/verification" element={<VerificationPage />} />
          <Route path="/create-profile" element={<CreateProfilePage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/auth/callback" element={< AuthCallback />} />
      </Routes>
    </div>
  );
}

export default App;
