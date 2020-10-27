<?xml version="1.0" encoding="UTF-8"?>
<Workflow xmlns="http://soap.sforce.com/2006/04/metadata">
    <rules>
        <fullName>Update Field2</fullName>
        <active>false</active>
        <criteriaItems>
            <field>Contact.LastName</field>
            <operation>contains</operation>
            <value>Test</value>
        </criteriaItems>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
</Workflow>
