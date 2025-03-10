import AWSLogo from "../svg/AWSLogo";
import CloudflareLogo from "../svg/CloudflareLogo";
import { resourceToProvider, ResourceType } from "../util/api";

const ProviderLogo = ({
  resourceType,
  size,
}: {
  resourceType: ResourceType;
  size: number;
}) => {
  const provider = resourceToProvider[resourceType];

  switch (provider) {
    case "aws":
      return <AWSLogo size={size} />;
    case "cloudflare":
      return <CloudflareLogo size={size} />;
  }
};

export default ProviderLogo;
