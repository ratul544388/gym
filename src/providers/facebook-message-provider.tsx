import { CustomChat, FacebookProvider } from "react-facebook";

export const FacebookMessageProvider = () => {
  return (
    <FacebookProvider appId="2501575746670447" chatSupport>
      <CustomChat pageId="167130426494021" minimized={false} />
    </FacebookProvider>
  );
};
