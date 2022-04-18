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
  const consolidatedText = arr
    .map((item) => {
      return handleChange(item.value);
    })
    .join("\r\n");

  return (
    <EuiFlexItem>
      <EuiPanel>
        {arr.map((item) => {
          if (item.value) return <EuiText>{handleChange(item.value)}</EuiText>;
        })}
        <EuiSpacer size="m" />

        <EuiCopy textToCopy={consolidatedText}>
          {(copy) => (
            <EuiButton onClick={copy}>Click to copy input text</EuiButton>
          )}
        </EuiCopy>
      </EuiPanel>
    </EuiFlexItem>
  );
};
