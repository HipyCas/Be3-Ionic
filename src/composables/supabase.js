// eslint-disable-next-line no-unused-vars
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_KEY } from '../../env';
import store from '../store';

/**
 * A wrapper for supabase
 * @class
 * @constructor
 * @public
 */
/*export class Supabase {
  /**
   * @type {SupabaseClient}
   * @static
   *+/
  //eslint-disable-next-line unexpected token
  //static supabase;

  /**
   * Get the supabase instance
   * @static
   * @returns {SupabaseClient}
   *+/
  static getInstance() {
    if (Supabase.supabase === null || Supabase.supabase === undefined) {
      Supabase.supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
        autoRefreshToken: true,
        persistSession: true,
      });

      Supabase.supabase.auth.onAuthStateChange((event, session) => {
        console.log(`Supabase auth event :${event}`);

        if (event == 'SIGNED_IN') {
          store.dispatch('setUser', session.user);
          //vue.$store.dispatch('setUser', session.user); // TODO Implement this in the actual store
        } else {
          store.dispatch('setUser', null);
        }
      });
    }
    return Supabase.supabase;
  }
}*/

/**
 * @type {SupabaseClient}
 */
const _supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  autoRefreshToken: true,
  persistSession: true,
});
console.info('Created supabase instance: ', _supabase);

_supabase.auth.onAuthStateChange((event, session) => {
  console.log(`Supabase auth event: `, event);

  if (event == 'SIGNED_IN') {
    console.log('Signed in with this session: ', session);
    store.dispatch('setUser', session.user);
  } else {
    console.log('Done something different to sign in: ', event);
    store.dispatch('setUser', null);
  }
});
console.info('Supabase auth handlers set');

export const supabase = _supabase;
