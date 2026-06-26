import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface VerifyOtpEmailProps {
  username: string;
  otp: string;
}

export const VerifyOtpEmail = ({ username, otp }: VerifyOtpEmailProps) => {
  return (
    <Tailwind>
      <Html>
        <Head />

        <Preview>Your verification code is {otp}</Preview>

        <Body className="m-0 bg-[#F5F7FA] py-10 font-sans">
          <Container className="mx-auto max-w-[600px] overflow-hidden rounded-2xl bg-white shadow-lg">
            {/* Header */}
            <Section className="bg-[#111827] px-10 py-10 text-center">
              <Text className="m-0 text-3xl font-bold text-white">
                Email Verification
              </Text>
            </Section>

            {/* Content */}
            <Section className="px-10 py-12 text-center">
              <Text className="m-0 text-3xl font-bold text-gray-900">
                Verify your email
              </Text>

              <Text className="mx-auto mt-5 max-w-[430px] text-base leading-7 text-gray-600">
                Thanks for signing up! Use the verification code below to
                complete your account setup.
              </Text>

              {/* OTP Box */}
              <Section className="my-10 rounded-xl border border-gray-200 bg-gray-50 px-8 py-6">
                <Text
                  className="m-0 text-center text-[42px] font-bold tracking-[14px] text-gray-900"
                  style={{ letterSpacing: "14px" }}
                >
                  {otp}
                </Text>
              </Section>

              <Text className="text-sm text-gray-500">
                This code expires in{" "}
                <strong className="text-gray-900">10 minutes</strong>.
              </Text>

              <Text className="mt-6 text-sm leading-6 text-gray-500">
                {`If you didn't create an account, you can safely ignore this
                email. No further action is required.`}
              </Text>
            </Section>

            {/* Divider */}
            <Section className="border-t border-gray-200 px-10 py-8">
              <Text className="m-0 text-center text-xs text-gray-500">
                For security reasons, never share this verification code with
                anyone.
              </Text>

              <Text className="mt-6 text-center text-xs text-gray-400">
                © {new Date().getFullYear()} {username}. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};

VerifyOtpEmail.PreviewProps = {
  username: "Acme",
  otp: "483291",
} satisfies VerifyOtpEmailProps;

export default VerifyOtpEmail;
