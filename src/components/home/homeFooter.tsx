import React from 'react'
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export function HomeFooter() {
  const { t } = useTranslation()

  return (
    <footer className="mx-auto">
      <div className="container border-t p-8">
        <div className="flex flex-col flex-wrap justify-between gap-8 sm:flex-row">
          <div>
            <Link to="/" className="text text-4xl font-bold transition-colors duration-1000 hover:text-white">
              UP
            </Link>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-sm ">
                  Unlimited Possibilities
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-sm ">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm ">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm ">
                  Returns
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Connect</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-sm ">
                  Facebook
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm ">
                  Twitter
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm ">
                  Instagram
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8">
          <ul className="flex flex-wrap justify-end gap-4 sm:gap-12">
            <li>
              <Link to="#" className="text-sm ">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link to="#" className="text-sm ">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
