const mix = require('laravel-mix')
import {SimpleImageProcessor} from './index.js'

mix.extend('imgs', new SimpleImageProcessor())