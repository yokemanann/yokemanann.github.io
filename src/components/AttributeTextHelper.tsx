import { useState } from "react";
import {
  EuiPage,
  EuiPageHeader,
  EuiButton,
  EuiPageContentBody,
  EuiPageBody,
  EuiFlexGrid,
  EuiFlexItem,
  EuiPanel,
  EuiFieldText,
  EuiFormRow,
  EuiText,
  EuiFlexGroup,
  EuiSpacer,
} from "@elastic/eui";

class Inp {
  type: string = "text";
  id: number = 1;
  value: string = "";
}

export const CustomForm = ({ button = <></> }) => {
  const [arr, setArr] = useState([new Inp()]);

  const addInput = () => {
    setArr((s) => {
      return [...s, new Inp()];
    });
  };

  const handleChange = (e: any) => {
    e.preventDefault();

    const index = e.target.id;
    setArr((s) => {
      const newArr = s.slice();
      if (newArr[index] !== undefined) newArr[index].value = e.target.value;

      return newArr;
    });
  };

  const forJS = (e: String) => {
    return e;
  };

  const forAjax = (e: String) => {
    return `$data['${e}'] = $param['${e}'];`;
  };

  const forAPI = (e: String) => {
    return `$${e} = !empty($param['data']['${e}'])?trim($param['data']['${e}']): '';`;
  };

  return (
    <EuiPage paddingSize="l">
      <EuiPageBody>
        <EuiPageHeader
          iconType="logoElastic"
          pageTitle="PHP data attributes helper"
          rightSideItems={[button, <EuiButton>Do something</EuiButton>]}
          bottomBorder
        />
        <EuiPageContentBody>
          <EuiFlexGrid columns={1}>
            <EuiFlexItem>
              <EuiPanel>
                <EuiFlexItem>
                  {arr.map((item, i) => {
                    item.id = i;
                    return (
                      <EuiFormRow id={item.id.toString()} key={i}>
                        <EuiFieldText
                          placeholder="Placeholder text"
                          value={item.value}
                          onChange={handleChange}
                          key={i}
                          id={item.id.toString()}
                        />
                      </EuiFormRow>
                    );
                  })}
                </EuiFlexItem>
                <EuiSpacer />
                <EuiFlexGroup
                  responsive={false}
                  wrap
                  gutterSize="s"
                  alignItems="center"
                >
                  <EuiFlexItem grow={false}>
                    <EuiButton onClick={addInput} iconType="plus">
                      Add
                    </EuiButton>
                  </EuiFlexItem>
                </EuiFlexGroup>
              </EuiPanel>
            </EuiFlexItem>
          </EuiFlexGrid>
          <EuiFlexGrid columns={3}>
            <EuiFlexItem>
              <EuiPanel>
                {arr.map((item, i) => {
                  if (item.value) return <EuiText>{forJS(item.value)}</EuiText>;
                })}
              </EuiPanel>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiPanel>
                <EuiText>
                  {arr.map((item, i) => {
                    if (item.value)
                      return <EuiText>{forAjax(item.value)}</EuiText>;
                  })}
                </EuiText>
              </EuiPanel>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiPanel>
                <EuiText>
                  {arr.map((item, i) => {
                    if (item.value)
                      return <EuiText>{forAPI(item.value)}</EuiText>;
                  })}
                </EuiText>
              </EuiPanel>
            </EuiFlexItem>
          </EuiFlexGrid>
        </EuiPageContentBody>
      </EuiPageBody>
    </EuiPage>
  );
};
