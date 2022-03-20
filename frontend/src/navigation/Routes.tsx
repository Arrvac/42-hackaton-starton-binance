import { FC } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { CreateBooks } from "../pages/CreateBooks";
import { AllBooks } from "../pages/AllBooks";
import { Home } from "../pages/Home";

export const Routes: FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path={`/create-book`} component={CreateBooks} />
		    <Route exact path={`/all-books`} component={AllBooks} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};
