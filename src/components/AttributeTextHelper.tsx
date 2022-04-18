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
  EuiFlexGroup,
  EuiSpacer,
} from "@elastic/eui";
import { Inp } from "./Inp";
import { TextList } from "./TextList";


export const AttributeTextHelper = ({ button = <></> }) => {
  const [arr, setArr] = useState([new Inp()]);
  var funcs : { (s: string): string; }[]
  funcs = [];

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

  const forJS = (e: string): string => {
    return `${e}: $("#${e}").val(),`;
  };

  const forAjax = (e: string): string => {
    return `$data['${e}'] = $param['${e}'];`;
  };

  const forAPI = (e: string): string=> {
    return `$${e} = !empty($param['data']['${e}'])?trim($param['data']['${e}']): '';`;
  };

  funcs.push(forJS);
  funcs.push(forAjax);
  funcs.push(forAPI);

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
            {
              funcs.map((item, i) => {
                return <TextList arr={arr} handleChange={item} key={i}></TextList>
              })
            }
          </EuiFlexGrid>
        </EuiPageContentBody>
      </EuiPageBody>
    </EuiPage>
  );
};
