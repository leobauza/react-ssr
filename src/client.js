import React from "react";
import { hydrate } from "react-dom";

import Counter from "./components/Counter";

const app = document.getElementById( "app" );
hydrate( <Counter />, app );
