import Home from '../views/pages/home/home';
import Favorite from '../views/pages/favorite/favorite';
import Detail from '../views/pages/detail/detail';

const Routes = {
  '/': Home, // default page
  '/home': Home,
  '/fav': Favorite,
  '/detail/:id': Detail,
};

export default Routes;
