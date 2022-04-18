import {
  EuiButton,
  EuiCopy,
  EuiFlexItem,
  EuiPanel,
  EuiSpacer,
  EuiText,
} from "@elastic/eui";
import { Inp } from "./Inp";

interface Props {
  arr: Inp[];
  handleChange: (value: string) => string;
}

export const TextList: React.FC<Props> = ({ arr, handleChange }) => {
  let consolidatedText = arr
    .map((item) => {
      if (item.value && item.value !== "" && item.value !== undefined)
        return handleChange(item.value);
      else return "";
    })
    .filter((item) => item !== "")
    .join("\r\n");

  if (consolidatedText !== "") console.log("a" + consolidatedText + "b");

  return (
    <EuiFlexItem>
      <EuiPanel>
        {arr.map((item, i) => {
          if (item.value)
            return <EuiText key={i}>{handleChange(item.value)}</EuiText>;
          else return "";
        })}
        <EuiSpacer size="m" />
        
        {consolidatedText !== "" ? (
          <EuiCopy textToCopy={consolidatedText}>
            {(copy) => (
              <EuiButton onClick={copy}>Click to copy input text</EuiButton>
            )}
          </EuiCopy>
        ) : (
          ""
        )}
      </EuiPanel>
    </EuiFlexItem>
  );
};
