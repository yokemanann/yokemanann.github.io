import { useState } from "react";
import {
  EuiPage,
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
  EuiRadioGroup,
  EuiTextArea,
} from "@elastic/eui";
import { Inp } from "./Inp";
import { TextList } from "./TextList";

export const AttributeTextHelper = () => {
  const [arr, setArr] = useState([new Inp()]);
  var funcs: { (s: string): string }[];
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

  const forAPI = (e: string): string => {
    return `$${e} = !empty($param['data']['${e}'])?trim($param['data']['${e}']): '';`;
  };

  funcs.push(forJS);
  funcs.push(forAjax);
  funcs.push(forAPI);

  const inputTypeList = "list";
  const inputTypeTextArea = "textarea";
  const radios = [
    {
      id: inputTypeList,
      label: "List",
    },
    {
      id: inputTypeTextArea,
      label: "Text Area",
    },
  ];
  const [inputTypeSelected, setInputTypeSelected] = useState(inputTypeList);
  const [textAreaValue, setTextAreaValue] = useState("");

  const onInputTypeChange = (optionId: string) => {
    setInputTypeSelected(optionId);

    if (optionId === inputTypeTextArea) {
      const consolidatedText = arr
        .map((item) => {
          if (item.value && item.value !== "") return item.value;
          else return "";
        })
        .filter((item) => item !== "")
        .join("\n");
      setTextAreaValue(consolidatedText);
    } else if (optionId == inputTypeList) {
      textAreaAppend(textAreaValue);
    }
  };

  const textAreaAppend = (_string: string) => {
    const splitTextArr = _string.split(/\n/).map((item) => {
      let newInp = new Inp();
      newInp.value = item;
      return newInp;
    });
    setArr([...splitTextArr]);
  };

  const onTextAreaChange = (e: any) => {
    setTextAreaValue(e.target.value);
    textAreaAppend(e.target.value);
  };

  return (
    <EuiPage paddingSize="l">
      <EuiPageBody>
        <EuiPageContentBody>
          <EuiFlexGrid columns={1}>
            <EuiFlexItem>
              <EuiPanel>
                <EuiRadioGroup
                  style={{ textAlign: "left", marginBottom: "15px" }}
                  options={radios}
                  idSelected={inputTypeSelected}
                  onChange={(id) => onInputTypeChange(id)}
                  name="radio group"
                  legend={{
                    children: <span>This is a legend for a radio group</span>,
                  }}
                />

                {inputTypeSelected === inputTypeList ? (
                  <div>
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
                  </div>
                ) : (
                  <div style={{ textAlign: "left" }}>
                    <EuiTextArea
                      placeholder="Placeholder text"
                      aria-label="Use aria labels when no actual label is in use"
                      value={textAreaValue}
                      onChange={(e: any) => onTextAreaChange(e)}
                    />
                  </div>
                )}
              </EuiPanel>
            </EuiFlexItem>
          </EuiFlexGrid>
          <EuiFlexGrid columns={3}>
            {funcs.map((item, i) => {
              return (
                <TextList arr={arr} handleChange={item} key={i}></TextList>
              );
            })}
          </EuiFlexGrid>
        </EuiPageContentBody>
      </EuiPageBody>
    </EuiPage>
  );
};
