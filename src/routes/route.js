import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FullPageLoader from "../components/common/FullPageLoader";
import PrivateRoutes from "../utils/PrivateRoutes";

const Login = lazy(() => import("../pages/Login/login"));
const M3uLogin = lazy(() => import("../pages/Login/m3uLogin"));
const LoginType = lazy(() => import("../pages/Login/loginType"));
const PlayList = lazy(() => import("../pages/Login/playlist"));
const Dashboard = lazy(() => import("../pages/Dashboard/dashboard"));
const M3UDashboard = lazy(() => import("../pages/Dashboard/m3u/dashboard"));
const LiveTvCategories = lazy(() => import("../pages/LiveTv/liveTvCategories"));
const MoviesCategories = lazy(() => import("../pages/Movies/MoviesCategories"));
const MoviesM3uCategories = lazy(() =>
  import("../pages/Movies/m3u/MoviesCategories")
);
const MoviesM3uInfo = lazy(() => import("../pages/Movies/m3u/MoviesInfo"));
const SeriesM3uInfo = lazy(() => import("../pages/Series/m3u/SeriesInfo"));
const SeriesCategories = lazy(() => import("../pages/Series/SeriesCategory"));
const LiveTv = lazy(() => import("../pages/LiveTv/liveTv"));
const M3uLiveTv = lazy(() => import("../pages/LiveTv/m3u/M3uLive"));
const M3uLiveTvMain = lazy(() => import("../pages/LiveTv/m3u/M3uLiveMain"));
const M3uSeries = lazy(() => import("../pages/Series/m3u/series"));
const SeriesInfo = lazy(() => import("../pages/Series/SeriesInfo"));
const Episodes = lazy(() => import("../pages/Series/Episodes"));
const MoviesInfo = lazy(() => import("../pages/Movies/MoviesInfo"));
const Favourites = lazy(() => import("../pages/Favourites/favourites"));
const Settings = lazy(() => import("../pages/Dashboard/settings"));
const Profile = lazy(() => import("../pages/Dashboard/profile"));
const M3uProfile = lazy(() => import("../pages/Dashboard/m3u/m3u-profile.js"));

const ChildLock = lazy(() => import("../pages/Dashboard/childLock"));
const Epg = lazy(() => import("../pages/Dashboard/epg.js"));

const MainRoute = () => (
  <Router>
    <Suspense fallback={<FullPageLoader />}>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/m3uDashboard" element={<M3UDashboard />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/child-lock" element={<ChildLock />} />
          <Route path="/epg" element={<Epg />} />
          <Route path="/livetvCategories" element={<LiveTvCategories />} />
          <Route
            path="/dashboard/moviesCategories"
            element={<MoviesCategories />}
          />
          <Route
            path="/dashboard/m3u/moviesCategories"
            element={<MoviesM3uCategories />}
          />
          <Route
            path="/dashboard/m3u/movies-info"
            element={<MoviesM3uInfo />}
          />
          <Route
            path="/dashboard/m3u/series-info"
            element={<SeriesM3uInfo />}
          />
          <Route path="/seriesCategories" element={<SeriesCategories />} />
          <Route path="/livetv" element={<LiveTv />} />
          <Route path="/m3u-live-tv" element={<M3uLiveTv />} />
          <Route path="/m3u-live-main" element={<M3uLiveTvMain />} />

          <Route path="/m3u-series" element={<M3uSeries />} />

          <Route
            path="/dashboard/moviesCategories/movies/movie-info"
            element={<MoviesInfo />}
          />
          <Route path="/series-info" element={<SeriesInfo />} />
          <Route path="/episodes" element={<Episodes />} />
        </Route>

        <Route path="/xtream-code" element={<Login />} />
        <Route path="/" element={<LoginType />} />
        <Route path="/m3u-login" element={<M3uLogin />} />
        <Route path="/xtream-code/playlist" element={<PlayList />} />
        <Route path="/m3u-profile" element={<M3uProfile />} />
      </Routes>
    </Suspense>
  </Router>
);
export default MainRoute;
