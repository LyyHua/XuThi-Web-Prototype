import { Dimmer, Loader } from "semantic-ui-react";

type Props = {
    inverted?: boolean;
    content?: string;
}

export default function LoadingComponent({inverted = true, content = 'Đang tải...'}: Props) {
  return (
    <Dimmer inverted={inverted} active>
        <Loader content={content} />
    </Dimmer>
  )
}