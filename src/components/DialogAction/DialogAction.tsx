import { Box, Button, Dialog, Flex, Tabs, Text, TextField } from '@radix-ui/themes';
import { useContext } from 'react';
import { setYear, setMonth, format, getMonth } from 'date-fns';
import GlobalContext from '~/context/GlobalContext';
import Icon from '~/components/customs/Icon';

type SideBarProps = {
  children: React.ReactNode;
};

const DialogAction = ({ children }: SideBarProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>{children}</Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Add Event</Dialog.Title>
        <Tabs.Root defaultValue="event">
          <Tabs.List>
            <Tabs.Trigger value="event">Event</Tabs.Trigger>
            <Tabs.Trigger value="appointment">Appointment</Tabs.Trigger>
          </Tabs.List>

          <Box pt="3">
            <Tabs.Content value="event">
              <div className="space-y-3">
                <input type="text" className="w-full rounded-md border-2 p-2" placeholder="Enter title" />
                <div className="flex gap-3">
                  <Icon name="time-outline" className="text-2xl" />
                </div>
              </div>
              <Dialog.Close>
                <Button className="float-end mt-5 flex rounded-lg bg-lightBlue">Save</Button>
              </Dialog.Close>
            </Tabs.Content>

            <Tabs.Content value="appointment">
              <Flex direction="column" gap="3">
                <label>
                  <Text as="div" size="2" mb="1" weight="bold">
                    Name
                  </Text>
                  <TextField.Root defaultValue="" placeholder="Title" />
                </label>
              </Flex>
              <Dialog.Close>
                <Button className="float-end mt-5 flex rounded-lg bg-lightBlue">Save</Button>
              </Dialog.Close>
            </Tabs.Content>
          </Box>
        </Tabs.Root>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default DialogAction;
