import { NextPage } from "next";
import Layout from "../components/layout/Layout";
import CreateMemoButton from "../features/showMemoList/CreateMemoButton";
import { useFetchMemos } from "../features/showMemoList/useFetchMemos";
import Memo from "../features/showMemoList/Memo";
import InfiniteScroll from "react-infinite-scroll-component";
import Refetch from "../features/showMemoList/Refetch";
import Private from "../features/auth/Private";

const Home: NextPage = () => {
  const { memos, fetchMemos, hasMore, error } = useFetchMemos();
  return (
    <Private>
      <Layout>
        <CreateMemoButton />
        <InfiniteScroll
          dataLength={memos.length}
          next={fetchMemos}
          hasMore={hasMore}
          loader={<>loading...</>}
        >
          {memos.map((memo) => (
            <Memo key={memo.id} memo={memo} />
          ))}
        </InfiniteScroll>
        {error !== null ? <Refetch refetch={fetchMemos} /> : null}
      </Layout>
    </Private>
  );
};

export default Home;
