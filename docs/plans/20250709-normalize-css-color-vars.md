# Normalize CSS color vars

The CSS color vars are nwo very unweildy and hard to understand.

- Normalize their names
- Make them reasonably short so that prettier isn't so annoying
- Make them all the same length so that it's easy to line them up to compare
- Document what they all mean

## Conventions

Types of keys:

| Description                   | Color        | Abbreviations           |
| ----------------------------- | ------------ | ----------------------- |
| Regular/default               | blue/gray    | `reg base plain`        |
| Clicked on / selected by user | dark orange  | `sel slct selct select` |
| (formerly "active", DONT USE) |              | `act actv activ active` |
| In selection group            | light orange | `rel rltd relat relatd` |
| or perhaps                    |              | `grp grup group`        |
| Key indicator targets         | light green  | `rgt trgt targt target` |
| Layer entry key               | light purple | `lay layr layer laysel` |
| or perhaps                    |              | `ely elay`              |
| Layer entry key (selected)    | dark purple  | `lsl lsel`              |
| or perhaps                    |              | `esl esel`              |

Colors we need for each state:

| Description                 | Abbreviations |
| --------------------------- | ------------- |
| Default bg                  | `bg defl`     |
| Hovered over by mouse bg    | `hv hovr`     |
| Focused on by keyboard bg   | `fc fcus`     |
| Active; mouse click down bg | `av actv`     |
| (not used consistently)     |               |
| Border                      | `br bord`     |
| (Same for all states)       |               |
| Diagram line color          | `li diag`     |
| (not needed for all)        |               |

## Method

Use a script to rename CSS vars project wide.

```sh
#!/bin/sh
set -eu

rename() {
    oldname=$1
    newname=$2
    # find ui models -type f -exec sed -i -E "s/(_|light-|dark-)$oldname/\1$newname/g" {} +
    find ui models -type f -exec sed -i -E "s/(--|--light-|--dark-|--_|--_light-|--_dark-)$oldname/\1$newname/g" {} +
}

rename key-bg                           key-reg-bg
rename key-border                       key-reg-br
rename key-hover-bg                     key-reg-hv
rename key-focus-bg                     key-reg-fc

rename key-active-bg                    key-sel-bg
rename key-active-border                key-sel-br
rename key-active-hover-bg              key-sel-hv
rename key-active-focus-bg              key-sel-fc
rename diagram-line-selected-color      key-sel-li

rename key-related-active-bg            key-grp-bg
rename key-related-active-border        key-grp-br
rename key-related-active-hover-bg      key-grp-hv
rename key-related-active-focus-bg      key-grp-fc

rename key-diagram-target-bg            key-tgt-bg
rename key-diagram-target-border        key-tgt-br
rename key-diagram-target-hover-bg      key-tgt-hv
rename key-diagram-target-focus-bg      key-tgt-fc
rename diagram-line-textref-color       key-tgt-li

rename key-layer-bg                     key-lay-bg
rename key-layer-border                 key-lay-br
rename key-layer-hover-bg               key-lay-hv
# rename key-layer-focus-bg               key-lay-fc  # Not present in project

rename key-layer-selected-bg            key-lsl-bg
rename key-layer-selected-border        key-lsl-br
rename key-layer-selected-hover-bg      key-lsl-hv
# rename key-layer-selected-focus-bg      key-lsl-fc  # Not present in project
```

That finds all of:

- `--old-name`
- `--_old-name`
- `--light-old-name`
- `--dark-old-name`

## Appendix

### Rejected conventions

I considered but decided against tracking key types and user selection separately,
separating out:

- Regular/default
- In selection group
- Key indicator targets
- Layer entry key

From:

- Selected by the user
- Not selected by the user
