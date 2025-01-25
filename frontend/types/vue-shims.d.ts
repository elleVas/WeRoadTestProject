// types/vue-shims.d.ts

import { ApolloClient } from "apollo-client"; 
import { DocumentNode } from "graphql";

declare module "#app" {
  interface NuxtApp {
    $apollo: ApolloClient<any>;
  }
}
