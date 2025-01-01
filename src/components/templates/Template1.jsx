import styled from "styled-components";
import DragBlocks from "../draggables/DragBlocks";
import { useEffect, useMemo, useState } from "react";
import ExperiencesBlocks from "../experiences/ExperiencesBlock";
import { useCV } from "../../CVContext";
import Template1Header from "./Template1Header";

const Template1 = () => {
  const { cv, updateMain, settings } = useCV();

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
            <i className="fa-solid fa-envelope"></i>
            john.doe@anymail.com
          </p>
        </SideContainer>
      </SideBar>
      <Main>
        <Template1Header />
        <CVName style={{ color: `${settings.title_color}` }}>
          Frontend web developer
        </CVName>
        <div style={{ width: "100%" }}>
          {" "}
          <DragBlocks main items={blocks} onReorder={setBlocks} />
        </div>
      </Main>
    </Root>
  );
};

export default Template1;

const Root = styled.div`
  font-size: 12px;
  display: flex;
  height: 100%;
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
  padding: 55px 36px;
`;

const Main = styled.div`
  padding: 55px 36px;
  width: 100%;
`;

const CVName = styled.div`
  font-weight: bold;
  line-height: 17px;
  font-size: 19px;
`;

const getMainComponent = (type, data, groupId) => {
  switch (type) {
    case "experiences":
      return (
        <ExperiencesBlocks groupId={groupId} title="Experiences" data={data} />
      );
    case "education":
      return (
        <ExperiencesBlocks groupId={groupId} title="Education" data={data} />
      );
    case "skills":
      return (
        <div>
          {data.map((skill) => (
            <p key={skill.label}>{skill.label}</p>
          ))}
        </div>
      );
    default:
      return null;
  }
};

const handleBlocksMain = (main) => {
  const arr = main.map((item) => {
    return {
      id: item.id,
      content: getMainComponent(item.type, item.data, item.id),
    };
  });

  return arr;
};
