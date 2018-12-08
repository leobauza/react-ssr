import React from "react";
import { hydrate } from "react-dom";

import Layout from "./components/Layout";

const app = document.getElementById( "app" );
hydrate( <Layout />, app );
