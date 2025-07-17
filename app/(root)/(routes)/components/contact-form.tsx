"use client";

import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";

import { BlurBG } from "@/components/blur-bg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { SendHorizonal } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email("Invalid email address"),
  phone: z.string().refine((val) => /^\+\d{1,3}\d{10}$/.test(val), {
    message: "Invalid phone number",
  }),
  referral: z.string(),
  message: z.string().nonempty({ message: "Message is required" }),
});
type FormValues = z.infer<typeof formSchema>;
const ContactForm = () => {
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      referral: "",
      message: "",
    },
  });
  const isLoading = form.formState.isSubmitting;
  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    try {
      await axios.post("/api/send", values);
      form.reset();
      toast({
        title: "Thank you for your message.",
        description: "I'll get back to you within 24 hours.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" bg-light dark:bg-dark relative overflow-hidden rounded-3xl px-5 py-8 md:px-12 md:py-16"
      >
        <BlurBG className="rounded-3xl" />
        <div className="relative z-20 flex flex-col md:grid md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-y-2.5 md:col-span-2 mb-5">
            <h2 className="text-[18px] md:text-[20px] lg:text-[24px] font-medium text-dark dark:text-light">
              Get in touch
            </h2>
            <p className="text-dark dark:text-light font-switzer font-light text-[14px] md:text-[16px]  lg:text-[18px]">
              Leave me a message and i will get back to you within{" "}
              <strong>24 hours</strong>
            </p>
          </div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-2.5">
                <FormLabel>What&apos;s your name?</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="Enter your name"
                    className="border-0 focus-visible:ring-0 text-dark dark:text-light font-switzer text-[14px] font-light focus-visible:ring-offset-0 relative"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-2.5">
                <FormLabel>What&apos;s your e-mail</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="Enter your mail"
                    className="border-0 focus-visible:ring-0 text-dark dark:text-light font-switzer text-[14px] font-light focus-visible:ring-offset-0 relative"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="space-y-2.5">
                <FormLabel>Phone no.</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="Enter your contact number"
                    className="border-0 focus-visible:ring-0 text-dark dark:text-light font-switzer text-[14px] font-light focus-visible:ring-offset-0 relative"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="referral"
            render={({ field }) => (
              <FormItem className="space-y-2.5">
                <FormLabel>How did you find me?</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="A google search, google ad, maybe some referral?"
                    className="border-0 focus-visible:ring-0 text-dark dark:text-light font-switzer text-[14px] font-light focus-visible:ring-offset-0 relative"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="space-y-2.5 col-span-2">
                <FormLabel>Tell me about your project and budget</FormLabel>
                <FormControl>
                  <Textarea
                    className="border-0 focus-visible:ring-0 text-dark dark:text-light font-switzer text-[14px] font-light focus-visible:ring-offset-0 relative"
                    placeholder="Something like, ”I'm looking for a react developer for my next projectand my budget is U$5k”."
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="md:col-span-2">
            <Button
              disabled={isLoading}
              size="lg"
              className="flex items-center uppercase font-medium gap-x-1 text-[14px] font-switzer rounded-xl"
              variant="purple"
            >
              Send
              <SendHorizonal className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default ContactForm;
