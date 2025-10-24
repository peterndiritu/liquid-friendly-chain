import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";

const PrivacyPolicy = () => {
  const lastUpdated = "October 24, 2025";

  const sections = [
    {
      id: "introduction",
      title: "1. Introduction",
      content: "Welcome to Fluid Network. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services. By accessing or using our services, you agree to the terms of this Privacy Policy."
    },
    {
      id: "information-collected",
      title: "2. Information We Collect",
      content: "We collect information that you provide directly to us, including wallet addresses for transactions, email addresses (if provided for newsletters), and usage data such as IP addresses, browser types, and interaction with our services. Blockchain transactions are publicly visible and permanent."
    },
    {
      id: "how-we-use",
      title: "3. How We Use Your Information",
      content: "We use the information we collect to provide, maintain, and improve our services; process transactions; send administrative information; respond to inquiries; monitor and analyze usage patterns; detect and prevent fraud; and comply with legal obligations."
    },
    {
      id: "data-sharing",
      title: "4. Data Sharing & Third Parties",
      content: "We do not sell your personal information. We may share information with service providers who assist in operating our platform, business partners with your consent, and legal authorities when required by law or to protect our rights."
    },
    {
      id: "blockchain-data",
      title: "5. Blockchain Data & Public Information",
      content: "Blockchain transactions are public and permanent. Once a transaction is recorded on the blockchain, it cannot be deleted or modified. Your wallet address and transaction history are publicly visible on blockchain explorers."
    },
    {
      id: "cookies",
      title: "6. Cookies & Tracking Technologies",
      content: "We use cookies and similar tracking technologies to enhance user experience, analyze website traffic, and remember user preferences. You can control cookie settings through your browser, but disabling cookies may limit functionality."
    },
    {
      id: "your-rights",
      title: "7. Your Rights & Choices",
      content: "Depending on your location, you may have rights to access, correct, delete, or restrict the use of your personal information. You can opt-out of marketing communications and control cookie preferences. Contact us to exercise these rights."
    },
    {
      id: "data-security",
      title: "8. Data Security",
      content: "We implement appropriate technical and organizational measures to protect your information. However, no method of transmission over the internet is 100% secure. You are responsible for maintaining the security of your wallet and private keys."
    },
    {
      id: "international-transfers",
      title: "9. International Data Transfers",
      content: "Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place to protect your information in accordance with this Privacy Policy."
    },
    {
      id: "childrens-privacy",
      title: "10. Children's Privacy",
      content: "Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately."
    },
    {
      id: "changes",
      title: "11. Changes to This Privacy Policy",
      content: "We may update this Privacy Policy periodically. We will notify you of material changes by posting the updated policy on our website and updating the 'Last Updated' date. Your continued use constitutes acceptance of the changes."
    },
    {
      id: "contact",
      title: "12. Contact Information",
      content: "If you have questions or concerns about this Privacy Policy, please contact us at: privacy@fluidnetwork.com or through our support channels."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last Updated: {lastUpdated}</p>

          <Card className="p-8 mb-8">
            <p className="text-sm text-muted-foreground">
              This Privacy Policy describes how Fluid Network collects, uses, and protects your personal information. 
              Please read this policy carefully to understand our practices regarding your data.
            </p>
          </Card>

          <div className="space-y-8">
            {sections.map((section) => (
              <div key={section.id} id={section.id}>
                <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
                <p className="text-muted-foreground leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>

          <Card className="p-6 mt-12 bg-muted/30">
            <h3 className="font-semibold mb-2">Questions or Concerns?</h3>
            <p className="text-sm text-muted-foreground">
              If you have any questions about this Privacy Policy or our data practices, please contact our privacy team at privacy@fluidnetwork.com
            </p>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;