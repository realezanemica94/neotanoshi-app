// index.jsx (o index.js — la extensión no importa demasiado)
import 'react-native-gesture-handler';     // necesario si usas React Navigation
import { registerRootComponent } from 'expo';
import App from '../App';

registerRootComponent(App);
