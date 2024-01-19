import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const Client = createClient({
    projectId: "9y0k9x41",
    dataset: "production",
    apiVersion: '2021-03-25',
    useCdn: true,
    token: 'skhkgbC6UekPyqxLLoGH1ipXyJSC4q4ZS2LyUzf6WNX2vzy1n92h80LaYYmK7UBxfxbyIXU7Q2wrD45W2a02Tl9k6VZpogwo46NJfeIMVIuzKERmET6A7zmmygdOLf3mZcW8ObXPzZ4UPh36gWMDXLULGaYVLqMGVA6Ye4dDkC4IBgb68nUg'
})

const builder = imageUrlBuilder(Client)
export const urlFor = (source) => builder.image(source);