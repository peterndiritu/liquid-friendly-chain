import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";

const TermsOfService = () => {
  const lastUpdated = "October 24, 2025";

  const sections = [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms",
      content: "By accessing or using Fluid Network's services, you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use our services. We reserve the right to modify these terms at any time."
    },
    {
      id: "use-of-services",
      title: "2. Use of Services",
      content: "You must be at least 18 years old to use our services. You agree to use the services only for lawful purposes and in accordance with these Terms. You are responsible for maintaining the security of your wallet and private keys."
    },
    {
      id: "wallet-transactions",
      title: "3. Wallet Connection & Transactions",
      content: "You are solely responsible for all transactions made through your connected wallet. All blockchain transactions are irreversible and final. We do not have access to or control over your wallet or funds. You acknowledge the risks associated with blockchain technology."
    },
    {
      id: "token-purchase",
      title: "4. Token Purchase Terms",
      content: "FLUID tokens are utility tokens with no guaranteed value. Token purchases are final and non-refundable. The value of tokens may fluctuate significantly. Tokens are not securities and do not represent ownership, equity, or voting rights in any entity."
    },
    {
      id: "risk-disclosures",
      title: "5. Risk Disclosures",
      content: "Blockchain technology involves significant risks including price volatility, technological complexity, regulatory uncertainty, and potential loss of funds. Smart contracts may contain vulnerabilities. There is no guarantee of profit or prevention of loss. You should not invest more than you can afford to lose."
    },
    {
      id: "intellectual-property",
      title: "6. Intellectual Property Rights",
      content: "All content, features, and functionality of our services are owned by Fluid Network and are protected by copyright, trademark, and other intellectual property laws. You may not reproduce, modify, or distribute our content without permission."
    },
    {
      id: "user-responsibilities",
      title: "7. User Responsibilities",
      content: "You agree to provide accurate information, maintain security of your account credentials, comply with all applicable laws and regulations, not engage in fraudulent activities, and not attempt to hack or disrupt our services."
    },
    {
      id: "prohibited-activities",
      title: "8. Prohibited Activities",
      content: "You may not use our services to engage in illegal activities, violate intellectual property rights, transmit malware or harmful code, manipulate markets, engage in wash trading, or circumvent security measures."
    },
    {
      id: "disclaimers",
      title: "9. Disclaimers & Limitations of Liability",
      content: "Our services are provided 'AS IS' without warranties of any kind. We do not guarantee uninterrupted or error-free service. To the maximum extent permitted by law, we are not liable for indirect, incidental, or consequential damages arising from your use of our services."
    },
    {
      id: "indemnification",
      title: "10. Indemnification",
      content: "You agree to indemnify and hold harmless Fluid Network, its affiliates, and their respective officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses arising from your use of the services or violation of these Terms."
    },
    {
      id: "dispute-resolution",
      title: "11. Dispute Resolution & Arbitration",
      content: "Any disputes arising from these Terms or your use of the services will be resolved through binding arbitration rather than in court. You waive your right to participate in class action lawsuits. Arbitration will be conducted in accordance with applicable arbitration rules."
    },
    {
      id: "governing-law",
      title: "12. Governing Law",
      content: "These Terms are governed by and construed in accordance with applicable laws, without regard to conflict of law principles. The exclusive jurisdiction for any disputes will be as specified in the arbitration clause."
    },
    {
      id: "modifications",
      title: "13. Modifications to Terms",
      content: "We reserve the right to modify these Terms at any time. Material changes will be notified through our website or via email. Your continued use of the services after changes constitutes acceptance of the modified Terms."
    },
    {
      id: "contact-info",
      title: "14. Contact Information",
      content: "For questions about these Terms of Service, please contact us at: legal@fluidnetwork.com or through our official support channels."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last Updated: {lastUpdated}</p>

          <Card className="p-8 mb-8 border-primary/20">
            <p className="text-sm font-semibold mb-2">Important Notice</p>
            <p className="text-sm text-muted-foreground">
              Please read these Terms of Service carefully before using Fluid Network's services. 
              These terms contain important information about your rights and obligations, including 
              limitations on liability and dispute resolution through arbitration.
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
            <h3 className="font-semibold mb-2">Legal Questions?</h3>
            <p className="text-sm text-muted-foreground">
              If you have questions about these Terms of Service, please contact our legal team at legal@fluidnetwork.com
            </p>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TermsOfService;