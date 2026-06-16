import React from 'react';
import styled from 'styled-components';

const SettingsContainer = styled.div`
  padding: 20px;
`;

const SettingsTitle = styled.h1`
  color: #333;
  margin-bottom: 20px;
`;

const SettingsCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const SettingsSection = styled.div`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h2`
  color: #333;
  font-size: 1.2rem;
  margin-bottom: 15px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #666;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #FFB942;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #FFB942;
  }
`;

const Button = styled.button`
  background: #FFB942;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s ease;

  &:hover {
    background: #e6a73d;
  }
`;

const Settings = () => {
  return (
    <SettingsContainer>
      <SettingsTitle>Settings</SettingsTitle>
      
      <SettingsCard>
        <SettingsSection>
          <SectionTitle>Profile Settings</SectionTitle>
          <FormGroup>
            <Label>Display Name</Label>
            <Input type="text" placeholder="Enter your display name" />
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <Input type="email" placeholder="Enter your email" />
          </FormGroup>
        </SettingsSection>

        <SettingsSection>
          <SectionTitle>Preferences</SectionTitle>
          <FormGroup>
            <Label>Theme</Label>
            <Select>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </Select>
          </FormGroup>
          <FormGroup>
            <Label>Language</Label>
            <Select>
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </Select>
          </FormGroup>
        </SettingsSection>

        <Button>Save Changes</Button>
      </SettingsCard>
    </SettingsContainer>
  );
};

export default Settings;