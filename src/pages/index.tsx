import type { NextPage } from "next";
import { trpc } from "../utils/trpc";
import styled from "styled-components";

const Home: NextPage = () => {
  const { data, isLoading } = trpc.useQuery(["example.hello"]);

  if (isLoading) {
    return <div>Loading....</div>;
  }

  return <Greeting>{data?.greeting}</Greeting>;
};

const Greeting = styled.h1`
  margin: 0 auto;
  text-align: center;
`;

export default Home;
