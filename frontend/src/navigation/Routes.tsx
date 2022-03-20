import { FC } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { CreateBooks } from "../pages/CreateBooks";
import { Book } from "../pages/Book";
import { Home } from "../pages/Home";

export const Routes: FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path={`/create-book`} component={CreateBooks} />
        <Route exact path={`/book/:id`} component={Book} />

        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};
