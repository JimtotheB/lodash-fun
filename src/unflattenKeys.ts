/**
 * @file unflattenKeys
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project lodash-fun
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */
import {compose, reduce, set, toPairs,} from 'lodash/fp'

export const unflattenKeys = compose(reduce((acc, [k, v]) => set(k, v, acc), {}), toPairs)