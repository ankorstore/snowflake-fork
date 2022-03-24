import SnowflakeApp from "../components/SnowflakeApp";
import { AppProvider } from "../context/AppContext";

const IndexPage = ({ levels, milestones }) => (
  <div>
    <AppProvider>
      <SnowflakeApp levels={levels} />
    </AppProvider>
  </div>
);

export default IndexPage;
