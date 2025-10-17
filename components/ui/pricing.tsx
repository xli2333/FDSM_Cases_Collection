"use client"

import { buttonVariants } from "@/components/ui/button"
import { useMediaQuery } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Check, Star } from "lucide-react"
import Link from "next/link"

interface PricingPlan {
  name: string
  price: string
  yearlyPrice: string
  period: string
  features: string[]
  description: string
  buttonText: string
  href: string
  isPopular: boolean
}

interface PricingProps {
  plans: PricingPlan[]
  title?: string
  description?: string
}

export function Pricing({
  plans,
  title = "Simple, Transparent Pricing",
  description = "Choose the plan that works for you\nAll plans include access to our platform, lead generation tools, and dedicated support.",
}: PricingProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)")

  return (
    <div className="container py-20 mx-auto">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl text-white">{title}</h2>
        <p className="text-lg text-gray-400 max-w-3xl mx-auto whitespace-pre-line">{description}</p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
            }}
            className={cn(
              `rounded-2xl border p-6 backdrop-blur-md text-center flex flex-col relative`,
              plan.isPopular ? "bg-white/[0.08] border-blue-400 border-2 scale-105 shadow-xl shadow-blue-500/20" : "bg-white/[0.03] border-white/10",
            )}
          >
            {plan.isPopular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 py-1 px-4 rounded-full flex items-center gap-1.5">
                <Star className="text-white h-4 w-4 fill-current" />
                <span className="text-white text-sm font-semibold">Popular</span>
              </div>
            )}
            <div className="flex-1 flex flex-col">
              <p className="text-lg font-semibold text-gray-300 mb-2">{plan.name}</p>
              <div className="mt-4 flex items-baseline justify-center gap-x-2">
                <span className="text-5xl font-bold tracking-tight text-white">
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="text-base font-medium text-gray-400">/ {plan.period}</span>
                )}
              </div>

              <div className="mt-2 mb-6 h-5"></div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span className="text-left text-gray-200 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-4">
                <Link
                  href={plan.href}
                  className={cn(
                    buttonVariants({
                      variant: "outline",
                    }),
                    "w-full text-base font-semibold",
                    "transition-all duration-300",
                    plan.isPopular
                      ? "bg-blue-500 text-white border-blue-400 hover:bg-blue-600"
                      : "bg-white/5 text-white border-white/20 hover:bg-white/10 hover:border-white/30",
                  )}
                >
                  {plan.buttonText}
                </Link>
                <p className="mt-4 text-xs text-gray-400">{plan.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
