import styled from "styled-components";
import DragBlocks from "../draggables/DragBlocks";
import { useEffect, useMemo, useState } from "react";
import ExperiencesBlocks from "../experiences/ExperiencesBlock";
import { useCV } from "../../CVContext";
import Template1Header from "./Template1Header";
import Icon from "../Icon";
import useStyles from "../hooks/useStyles";
import SkillsBlocks from "../skills/SkillsBlocks";

const Template1 = () => {
  const { cv, updateMain } = useCV();
  const styles = useStyles();

  const main = useMemo(() => cv.main, [cv.main]);

  const [blocks, setBlocks] = useState(handleBlocksMain(main));

  useEffect(() => {
    setBlocks(handleBlocksMain(main));
  }, [main]);

  useEffect(() => {
    updateMain(blocks);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blocks]);

  return (
    <Root>
      <SideBar>
        <SideContainer>
          <p>
            <Icon icon={"\uf0e0"} />
            {cv.email}
          </p>
        </SideContainer>
      </SideBar>
      <Main $styles={styles}>
        <Template1Header />

        <Content>
          <DragBlocks main items={blocks} onReorder={setBlocks} />
        </Content>
      </Main>
    </Root>
  );
};

export default Template1;

const Main = styled.div`
  padding: 30px 36px;
  width: 100%;
  .title-text {
    color: ${({ $styles }) => $styles.titleColor};
  }
  .resume-title {
    color: ${({ $styles }) => $styles.resumeTitleColor};
  }
  .company-label {
    color: ${({ $styles }) => $styles.companyColor};
  }
`;

const Root = styled.div`
  font-size: 12px;
  display: flex;
  height: 100%;
`;

const Content = styled.div`
  width: 100%;
`;

const SideBar = styled.div`
  width: 218px;
  background-color: #333333;
  border-right: 1px solid #333333;
  color: #e4e4e4;
  max-width: 300px;
  min-width: 218px;
`;

const SideContainer = styled.div`
  padding: 38px 36px;
`;

const getMainComponent = (type, data, title, groupId) => {
  switch (type) {
    case "experiences":
      return <ExperiencesBlocks groupId={groupId} title={title} data={data} />;
    case "education":
      return <ExperiencesBlocks groupId={groupId} title={title} data={data} />;
    case "skills":
      return <SkillsBlocks groupId={groupId} title={title} data={data} />;
    default:
      return null;
  }
};

const handleBlocksMain = (main) => {
  const arr = main.map((item) => {
    return {
      id: item.id,
      title: item.title,
      content: getMainComponent(item.type, item.data, item.title, item.id),
    };
  });

  return arr;
};
